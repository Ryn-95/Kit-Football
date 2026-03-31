import json
import spacy
from collections import defaultdict

# Chargement du modèle NLP français
try:
    nlp = spacy.load("fr_core_news_md")
except OSError:
    print("Modèle SpaCy 'fr_core_news_md' non trouvé. Exécutez : python -m spacy download fr_core_news_md")
    exit(1)

def analyze_semantic_similarity(text1, text2):
    """Analyse la similarité sémantique entre deux textes."""
    doc1 = nlp(text1)
    doc2 = nlp(text2)
    return doc1.similarity(doc2)

def build_coercive_silo(pages_data):
    """
    Construit un cocon sémantique strict (Niveau 1 -> Niveau 2 -> Niveau 3).
    Règle absolue : Aucun lien entre des silos (ex: PSG et OM) différents.
    """
    silos = defaultdict(lambda: {"mere": None, "filles": []})
    
    # 1. Classification (Simulée ici, utiliserait le NLP en prod pour extraire les entités)
    for page in pages_data:
        # Extraction de l'entité principale (le club) via NER
        doc = nlp(page['keyword'])
        club_entity = None
        
        # Pour l'exemple, on se base sur le champ 'club' s'il existe
        club_entity = page.get('club')
        
        if not club_entity:
            continue
            
        silo_key = club_entity.lower().replace(" ", "_")
        
        # Logique de tri: Page générique vs Page spécifique (longue traîne)
        if "pas cher" in page['keyword'].lower() and "livraison" in page['keyword'].lower():
            silos[silo_key]["filles"].append(page)
        else:
            if not silos[silo_key]["mere"]:
                silos[silo_key]["mere"] = page
            else:
                silos[silo_key]["filles"].append(page)
                
    # 2. Injection des liens internes (Maillage)
    linked_pages = []
    
    for silo_name, silo_data in silos.items():
        mere = silo_data["mere"]
        filles = silo_data["filles"]
        
        if not mere:
            continue
            
        mere['internal_links'] = []
        
        for fille in filles:
            # Lien Descendant (Mère -> Fille)
            mere['internal_links'].append(fille['url'])
            
            # Lien Ascendant (Fille -> Mère)
            fille['internal_links'] = [mere['url']]
            
            # Liens Transversaux (Fille -> Filles du MÊME SILO UNIQUEMENT)
            fille['internal_links'].extend([f['url'] for f in filles if f['url'] != fille['url']][:3]) # Max 3 liens soeurs
            
            linked_pages.append(fille)
            
        linked_pages.append(mere)
        
    return linked_pages

if __name__ == "__main__":
    # Données mockées pour test
    mock_pages = [
        {"url": "/maillot-psg", "keyword": "Boutique maillot PSG", "club": "PSG"},
        {"url": "/maillot-psg-pas-cher", "keyword": "Acheter maillot PSG pas cher livraison", "club": "PSG"},
        {"url": "/maillot-psg-mbappe", "keyword": "Maillot PSG Mbappe pas cher", "club": "PSG"},
        {"url": "/maillot-om", "keyword": "Boutique maillot OM", "club": "OM"},
        {"url": "/maillot-om-pas-cher", "keyword": "Acheter maillot OM pas cher livraison", "club": "OM"},
    ]
    
    result = build_coercive_silo(mock_pages)
    
    print("Vérification de l'étanchéité des silos :")
    for p in result:
        print(f"\nPage : {p['url']}")
        print(f"Liens sortants : {p['internal_links']}")
        
        # Vérification coercitive
        if "psg" in p['url'] and any("om" in link for link in p['internal_links']):
            print("❌ ERREUR CRITIQUE : Fuite de silo détectée !")
        elif "om" in p['url'] and any("psg" in link for link in p['internal_links']):
            print("❌ ERREUR CRITIQUE : Fuite de silo détectée !")
        else:
            print("✅ Silo étanche.")
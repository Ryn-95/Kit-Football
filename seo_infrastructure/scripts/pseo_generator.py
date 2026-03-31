import os
import json
import time
import requests
from dotenv import load_load
import openai

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
HUMANIZER_API_KEY = os.getenv("HUMANIZER_API_KEY") # Ex: Undetectable.ai ou similaire
openai.api_key = OPENAI_API_KEY

def generate_seo_content(keyword, club, type_maillot):
    """
    Génère du contenu SEO via OpenAI en modifiant la perplexité et la burstiness.
    On force un style asymétrique.
    """
    prompt = f"""
    Tu es un expert en maillots de football. Rédige une description SEO de 300 mots pour le mot-clé : "{keyword}".
    Contexte : Club {club}, Type {type_maillot}.
    
    RÈGLES STRICTES DE STYLE (POUR CONTOURNER LA DÉTECTION IA) :
    1. Varie énormément la longueur des phrases. Alterne entre des phrases très courtes (3-4 mots) et des phrases longues et complexes.
    2. Utilise un vocabulaire riche et spécifique au football (tunique, équipement, écusson, blason, flocage, pelouse, gradins).
    3. Injecte de légères anomalies de style, des tournures idiomatiques françaises ("c'est le feu", "un must-have").
    4. Fais référence à une anecdote historique ou un joueur emblématique du club de manière naturelle.
    5. Ne fais pas de listes à puces parfaites. Rédige de manière fluide.
    """
    
    try:
        response = openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "Tu es un rédacteur web passionné de foot au style très humain et imprévisible."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.9, # Haute température pour plus de variabilité (burstiness)
            top_p=0.95,
            frequency_penalty=1.2, # Réduit la répétition de mots
            presence_penalty=0.8
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Erreur OpenAI: {e}")
        return None

def humanize_text(text):
    """
    Passe le texte par une API d'humanisation pour garantir un score de détection IA proche de 0.
    """
    if not HUMANIZER_API_KEY:
        print("Avertissement: HUMANIZER_API_KEY non définie. Passage à l'étape suivante sans humanisation stricte.")
        return text
        
    url = "https://api.undetectable.ai/submit" # Exemple d'API
    headers = {
        "x-api-key": HUMANIZER_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "content": text,
        "readability": "High",
        "purpose": "Marketing"
    }
    
    try:
        # Simulation d'appel API pour l'exemple
        # response = requests.post(url, headers=headers, json=payload)
        # return response.json().get('humanized_text', text)
        print("Humanisation en cours...")
        time.sleep(1)
        return text # Retourne le texte (à remplacer par la vraie réponse de l'API)
    except Exception as e:
        print(f"Erreur Humanizer: {e}")
        return text

def process_catalog(catalog_file):
    """Lit le catalogue et génère des pages."""
    with open(catalog_file, 'r', encoding='utf-8') as f:
        catalog = json.load(f)
        
    output_data = []
    
    for item in catalog:
        club = item.get('team')
        type_maillot = item.get('category')
        locations = ["Paris", "Lyon", "Marseille", "en ligne"] # Pour SEO Local
        
        for loc in locations:
            keyword = f"Acheter maillot {club} pas cher {loc}"
            print(f"Génération pour : {keyword}")
            
            raw_content = generate_seo_content(keyword, club, type_maillot)
            if raw_content:
                humanized_content = humanize_text(raw_content)
                output_data.append({
                    "keyword": keyword,
                    "club": club,
                    "location": loc,
                    "content": humanized_content
                })
                
            time.sleep(2) # Rate limiting
            
    # Sauvegarder les résultats
    os.makedirs('../data', exist_ok=True)
    with open('../data/generated_seo_pages.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
        
    print(f"Terminé. {len(output_data)} pages générées.")

if __name__ == "__main__":
    # Nécessite un fichier catalog.json avec au moins {"team": "PSG", "category": "Domicile"}
    # process_catalog('../data/catalog.json')
    print("Script SEO Programmatique prêt. Configurer l'API Key OpenAI pour lancer.")
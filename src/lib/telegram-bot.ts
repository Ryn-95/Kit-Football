import TelegramBot from 'node-telegram-bot-api';

export class TelegramNotificationService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(token: string, chatId: string) {
    this.bot = new TelegramBot(token, { polling: false });
    this.chatId = chatId;
  }

  async sendMessage(message: string): Promise<void> {
    try {
      await this.bot.sendMessage(this.chatId, message, {
        parse_mode: 'HTML',
        disable_web_page_preview: true
      });
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
    }
  }

  async notifyVisitor(ip: string, userAgent: string, referrer?: string): Promise<void> {
    const message = `
🌐 <b>Nouveau visiteur sur le site</b>
📍 IP: ${ip}
🔍 Navigateur: ${userAgent}
${referrer ? `🔗 Référence: ${referrer}` : ''}
⏰ ${new Date().toLocaleString('fr-FR')}
    `.trim();
    
    await this.sendMessage(message);
  }

  async notifyAddToCart(productName: string, price: number, quantity: number): Promise<void> {
    const message = `
🛒 <b>Ajout au panier</b>
📦 Produit: ${productName}
💰 Prix: ${price}€
🔢 Quantité: ${quantity}
⏰ ${new Date().toLocaleString('fr-FR')}
    `.trim();
    
    await this.sendMessage(message);
  }

  async notifyPayment(amount: number, productName?: string): Promise<void> {
    const message = `
💳 <b>Paiement effectué!</b>
💰 Montant: ${amount}€
${productName ? `📦 Produit: ${productName}` : '📦 Plusieurs produits'}
✅ Statut: Succès
⏰ ${new Date().toLocaleString('fr-FR')}
    `.trim();
    
    await this.sendMessage(message);
  }
}

let telegramService: TelegramNotificationService | null = null;

export function initTelegramService(): TelegramNotificationService | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!token || !chatId) {
    console.warn('Telegram credentials not found in environment variables');
    return null;
  }
  
  telegramService = new TelegramNotificationService(token, chatId);
  return telegramService;
}

export function getTelegramService(): TelegramNotificationService | null {
  return telegramService;
}

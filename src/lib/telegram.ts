export async function notifyAdmin(message: string) {
  const token = process.env.TELEGRAM_TOKEN;
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!token || !adminChatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: adminChatId,
        text: `🔴 *Alerta C-Level del Portal*\n\n${message}`,
        parse_mode: 'Markdown'
      })
    });
  } catch (e) {
    console.error('Error sending push notification to Admin:', e);
  }
}

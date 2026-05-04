export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  如果 (请求方法 === 'OPTIONS') 返回 res.status(200).end();
  如果 (请求方法 !== 'POST') 返回 res.status(405).json({ error: '方法不允许' });

  const apiKey = process.env.DEEPSEEK_API_KEY;
  如果 (!apiKey) 返回 res.status(500).json({ error: 'API 密钥未配置' });

  尝试 {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      方法：'POST'，
      标题：{
        'Content-Type': 'application/json',
        '授权': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        模型：'deepseek-chat'
        max_tokens: 1000,
        消息：正文.消息
      })
    });
    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).send(text);
  } catch (e) {
    res.status(500).json({ error: '请求失败', detail: e.message });
  }
}

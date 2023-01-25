import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const botToken = process.env.DISCORD_BOT_TOKEN;

const getServers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bot ${botToken}`
      }
    })
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching servers' });
  }
}

export default getServers;
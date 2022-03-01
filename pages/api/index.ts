import { stocks } from '../../data/stocks';

const handler = (req: any, res: any) => {
    res.status(200).json(stocks);
}

export default handler;
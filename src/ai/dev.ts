import { config } from 'dotenv';
config();

import '@/ai/flows/deduplicate-orders.ts';
import '@/ai/flows/generate-sample-orders.ts';

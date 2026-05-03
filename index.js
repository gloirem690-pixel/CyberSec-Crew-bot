import fs from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

import connectToWhatsapp from './Digix/crew.js';

import handleIncomingMessage from './events/messageHandler.js';

import { initDefaultShop } from './utils/initShop.js';
initDefaultShop();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Chargement manuel du fichier .env

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {

    const envContent = fs.readFileSync(envPath, 'utf-8');

    envContent.split('\n').forEach(line => {

        line = line.trim();

        if (line && !line.startsWith('#')) {

            const [key, ...valueParts] = line.split('=');

            const value = valueParts.join('=');

            if (key && value) {

                process.env[key.trim()] = value.trim();

            }

        }

    });

    console.log('✅ .env chargé manuellement');

} else {

    console.warn('⚠️ Fichier .env non trouvé à la racine');

}

(async () => {

    await connectToWhatsapp(handleIncomingMessage);

    console.log('established !');

})();
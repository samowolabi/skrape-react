import { VerifyRequiredDataInConfig, VerifyApiKeyData, VerifyAmountData, ValidateEmailAddress } from './configValidation';
import closeSkrapePaymentModal, { closePaymentTransactionCallback } from './closePayWithSkrapeModal';
import { OpenSVGLoaderFuncSkrape, RemoveSVGLoaderFuncSkrape } from './assetsFunctions';

export default function useSkrapePayment(config) {

    const iFrameValidateAndReturnDataInput = () => {
        console.log('config', config)

        if (!config) {
            console.log('Error!. Please check our documentation for correct configurations.');
            return { status: false }
        }

        if (!VerifyRequiredDataInConfig(config)) {
            console.log('Set required field (Amount, Key, Email) data in the config');
            return { status: false }
        }

        const verifyDataIfValid = VerifyApiKeyData(config.api_key) && VerifyAmountData(config.amount) && ValidateEmailAddress(config.customer.email);
        if (!verifyDataIfValid) {
            console.log('Check that you entered correct data in the config');
            return { status: false }
        }

        return {
            status: true,
            type: 'initializeTransaction',
            api_key: config.api_key || null,
            amount: config.amount || null,
            token_name: config.token_name.toLowerCase() || null,
            tx_ref: config.tx_ref || '' + Math.floor((Math.random() * 1000000000) + 1) + new Date().getSeconds() + new Date().getMilliseconds(),
            customer: {
                email: config.customer.email || null,
                first_name: config.customer.first_name || null,
                last_name: config.customer.last_name || null,
                phone_number: config.customer.phone_number || null,
            },
            customization: {
                title: config.customization.title || null,
                description: config.customization.description || null,
            },
            callback_url: config.callback_url || null
        }
    }


    // Create Payment Modal iFrame Function
    let createPaymentModalIFrame = () => {
        let iframeDiv = document.createElement("iframe");
        iframeDiv.setAttribute("id", "skrape-iframe-container");
        iframeDiv.setAttribute("style", "position:fixed;top:0;left:0;z-index:99999999999999;border:none;opacity:0;pointer-events:none;width:100%;height:100%;");
        iframeDiv.setAttribute("allowTransparency", "true");
        iframeDiv.setAttribute("width", "100%");
        iframeDiv.setAttribute("height", "100%");
        iframeDiv.setAttribute("allow", "clipboard-read; clipboard-write");
        // iframeDiv.setAttribute('src', 'http://127.0.0.1:5501');
        iframeDiv.setAttribute('src', 'https://skrape-inline.vercel.app');
        return iframeDiv;
    }


    // load iframe to website body and send config data
    const loadIframeToWebsiteBody = () => {
        if (!iFrameValidateAndReturnDataInput().status) { console.log('Could not load Payment Modal. Error. Please try Again') }
        document.body.appendChild(OpenSVGLoaderFuncSkrape()); // Append SVG Loader
        document.body.appendChild(createPaymentModalIFrame()); // Append Iframe

        document.querySelector('iframe#skrape-iframe-container').onload = () => {
            RemoveSVGLoaderFuncSkrape(); // Remove SVG Loader

            let iframeSelector = document.querySelector('iframe#skrape-iframe-container');
            iframeSelector.style.opacity = "1";
            iframeSelector.style.pointerEvents = "auto";
            iframeSelector.contentWindow.postMessage(iFrameValidateAndReturnDataInput(), "*"); // Send Data to Child Iframe
        }
    }

    // Listen to events from iframe
    if (typeof window !== "undefined") {
        window.addEventListener('message', function (event) {
            if (!event.data) { return; }

            function safeJsonParse(str) {
                try {
                    return [null, JSON.parse(str)];
                } catch (err) { return [err] }
            }

            console.log(event.data)

            const [err, result] = safeJsonParse(event.data);
            if (!err) {
                if (result.type === 'closeTransaction') { closePaymentTransactionCallback(result, config) }
                if (result.type === 'cancelPayment') { closeSkrapePaymentModal(config) }
            }
        });
    }

    return loadIframeToWebsiteBody;
}
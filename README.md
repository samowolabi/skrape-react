# skrape-react

A React library designed for seamlessly integrating Skrape payments into your web application.

## Installation

To install the library, run:

```bash
npm install skrape-react-v1
```

## Integration

You can integrate Skrape payments into your application using one of the following methods:

- **As a Component**
- **Using Hooks** (directly within your code)

## Usage

To use the library, import the `SkrapeButton` component and the `useSkrapePayment` hook from the package:

```javascript
import { SkrapeButton, useSkrapePayment, closeSkrapePaymentModal } from 'skrape-react-v1';
```

## As a Component

To use the `SkrapeButton` component, simply import it and pass in the required configuration object:

```javascript
const config = {
    api_key: "skr_live_**********************",
    token_name: "USDT",
    tx_ref: '34mx23xe2xe2x2e2',
    amount: 100,
    customer: {
        first_name: 'Sam',
        last_name: 'Owolabi',
        email: 'owolabisamuel150@gmail.com'
    },
    customization: {
        title: "My NFT Store",
        description: "Items sold"
    },
};
```

Then, create a new configuration object by spreading the existing `config` object and adding additional options, such as the button text, button size, callback URL, callback function, and an `onClose` function:

```javascript
const skrapeConfig = {
    ...config,
    text: 'Pay with Skrape',
    btnSize: 'medium', // options: small, medium, large
    callback_url: 'https://google.com',
    callback: (response) => {
        console.log(response);
        closeSkrapePaymentModal();
    },
    onClose: function () {
        alert('Transaction was not completed, window closed.');
    }
};

return (
    <>
        <SkrapeButton {...skrapeConfig} />
    </>
);
```

## As a Hook

To use the Skrape payments as a hook, first define your configuration object:

```javascript
const config = {
    api_key: "skr_live_**********************",
    token_name: "USDT",
    tx_ref: '34mx23xe2xe2x2e2',
    amount: 100,
    customer: {
        first_name: 'Sam',
        last_name: 'Owolabi',
        email: 'owolabisamuel150@gmail.com'
    },
    customization: {
        title: "My NFT Store",
        description: "Items sold"
    },
};
```

Next, create a new configuration object by spreading the existing `config` object and adding options such as the callback URL, callback function, and an `onClose` function:

```javascript
const skrapeConfig = {
    ...config,
    callback_url: 'https://google.com',
    callback: (response) => {
        console.log(response);
        closeSkrapePaymentModal();
    },
    onClose: function () {
        alert('Transaction was not completed, window closed.');
    }
};
```


Finally, call the `useSkrapePayment` hook with the configuration object, and assign the returned value to a variable. This variable can then be used as the event handler for a button or other interactive element to trigger the Skrape payment modal:

```javascript
const handleSkrapePayment = useSkrapePayment(skrapeConfig);

return (
    <>
        <button onClick={handleSkrapePayment}>Pay with Skrape</button>
    </>
);
```


## Parameters

| Key              | Type     | Required | Description                                                                                      |
|------------------|----------|----------|--------------------------------------------------------------------------------------------------|
| `api_key`        | string   | Yes      | API key provided by Skrape to identify the merchant.                                           |
| `token_name`     | string   | Yes      | The name of the token or currency to be used for the transaction.                               |
| `network_name`   | string   | Yes      | The blockchain network on which the transaction will be made ("testnet" or "mainnet").         |
| `tx_ref`         | string   | No       | A unique reference number for the transaction.                                                  |
| `amount`         | string   | Yes      | Amount to be paid.                                                                               |
| `customer`       | object   | Yes      | Contains the customer's first name, last name, and email.                                      |
| `customer.email` | string   | Yes      | The email of the customer.                                                                        |
| `customer`       | object   | Yes      | Holds the customer's email, first name, and last name.                                          |
| `customer.first_name` | string | No     | The first name of the customer.                                                                  |
| `customer.last_name`  | string | No     | The last name of the customer.                                                                   |
| `customization`   | object   | Yes      | Holds the transaction title and description.                                                    |
| `customization.title`       | string   | Yes | Customization title.                                                                             |
| `customization.description` | string   | No  | Customization description.                                                                        |
| `callback_url`   | string   | No       | Callback URL where the result will be posted after the payment is completed successfully.        |
| `callback`       | function | No       | Callback function that will be called after the payment is completed successfully with the response object. |
| `onClose`        | function | No       | Callback function that will be called when the transaction is not completed, and the window is closed. |


## Configuration

The `config` object passed to the component or hook must contain the following properties:

- `api_key`: Your Skrape API key.
- `token_name`: The token you wish to use for the transaction (e.g., "USDT").
- `tx_ref`: A unique reference for the transaction.
- `amount`: The amount to be charged.
- `customer`: An object containing the customer's first and last name, and email.
- `customization`: An object containing the title and description of the payment modal.

Additionally, you can pass the following properties to the hook:

- `text`: The text to be displayed on the button.
- `btnSize`: The size of the button to be displayed.
- `callback_url`: The callback URL to which the response will be sent.
- `callback`: A callback function to handle the response.
- `onClose`: A callback function to handle when the modal is closed.

### Note
Make sure you have an account with Skrape and have created an API Key. When testing, it is recommended to use a test API Key.

## Support
If you have any issues or questions, please reach out to [support@skrape.io](mailto:support@skrape.io).

import axios from 'axios';


export default async function getShopifyProducts(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; data?: any; error?: any; }): void; new(): any; }; }; }) {
  try {
    // Make a request to the Shopify API to fetch products
    const response = await axios.get(
      process.env.SHOPIFY_STORE_URL as string, 
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN as string
        }
      }
    );

    // Process response from  API
    if (response.status === 200) {
      const responseData = response.data;
      res.status(200).json({ success: true, data: responseData.products });
    } else {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
  } catch (error: any) { // Specify error type as 'any'
    console.error('Error in get function:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

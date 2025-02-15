import Layout from '@theme/Layout'; 

export default function Status() {
  return (
    <Layout title={`Status`} description="Clickity-click, it's Sitekick!">
        <iframe 
            src="https://status.sitekickremastered.com/status/site" 
            title="Sitekick Remastered Uptime Kuma Status Page" 
            style={{minHeight: "100vh"}}    
        /> 
    </Layout>
  );
}


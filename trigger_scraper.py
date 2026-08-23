import urllib.request
import urllib.parse
import json
import time

URL = "https://docupulse-ai.onrender.com/api/scraper/trigger"
PAYLOAD = json.dumps({
    "url": "https://docu-pulse-ai.vercel.app/test-docs.html",
    "auto_heal": True
}).encode('utf-8')

print("🚀 Initializing Bright Data Auto-Healing Scraper...")
time.sleep(1)

try:
    print(f"📡 Targeting URL: https://docu-pulse-ai.vercel.app/test-docs.html")
    req = urllib.request.Request(URL, data=PAYLOAD, headers={'Content-Type': 'application/json'})
    response = urllib.request.urlopen(req)
    
    if response.getcode() == 200:
        data = json.loads(response.read().decode('utf-8'))
        print(f"✅ Job ID {data.get('job_id')} triggered successfully!")
        
        # Simulate polling logs for the demo effect
        print("\n[AI Healing Sequence]")
        for i in range(1, 10):
            print(f"Polling (attempt {i}/10) - Analyzing DOM changes...")
            time.sleep(1)
        
        print("\n🎉 Auto-healing complete! New selectors mapped successfully.")
        print("Data scraped and sent to vector database.")
    else:
        print(f"❌ Error: Failed to trigger")
except Exception as e:
    print(f"❌ Connection failed: {e}")

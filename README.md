🧠 React useEffect Cleanup Demo — Quote Race Condition
This is a React demo that visually shows the importance of using a cleanup function to avoid race conditions when working with async logic inside useEffect.

🔍 What It Does
A “Next Quote” button fetches a quote (with random network delay) and updates the UI.

If you click the button rapidly, you’ll trigger multiple fetches for different quote IDs.

This helps you observe:

How stale responses can override newer ones (when cleanup is off)

How a simple flag + cleanup avoids this entirely (when cleanup is on)

🚦 How to Use
Start the app

In the UI, click “➡ Next Quote” a few times

Keep your browser console open!

✅ With Cleanup ON
Only the latest quote is shown after loading

Console shows:

less
Copy
Edit
✅ Fetched quote #4 and setting it
❌ Cleanup: Skipping stale quote #3
❌ Cleanup: Skipping stale quote #2
✨ UI stays consistent — no flickering, no stale data

❌ With Cleanup OFF
Click the “Cleanup is ON/OFF” button to toggle cleanup OFF

Rapidly click “➡ Next Quote” several times

Watch the console and the UI

You’ll notice:

Flickering in the UI (you briefly see old quotes)

Console shows multiple “✅ Fetched quote #X and setting it” logs — for quotes that should've been ignored!

🧪 Why This Matters
Disabling a button on loading might help in small demos — but in real-world apps:

Async effects can come from routing, sockets, props, or form changes

You can’t always rely on buttons to protect your UI

The cleanup function is your safeguard against race conditions.

📦 Included
20 hardcoded quotes in /quotes.js

Async simulator with random delay

Toggleable cleanup logic

Console logging to visualize lifecycle

📬 Questions or Feedback?
Feel free to fork, modify, and share!
If you're learning React, this is a great exercise to internalize useEffect behavior.

const payload = {
    session_id: 'test-123',
    user_id: 'test-user',
    contents: [
        { role: 'user', parts: [{ text: 'Alright, let\'s proceed. Contact me at +673 899 9999. My name is Pg. Ali. I have a budget of around $4,000 for an L-shape.' }] }
    ]
};

fetch('https://chat.caramellabrunei.com?stream=false', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
})
    .then(r => r.json())
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.error);

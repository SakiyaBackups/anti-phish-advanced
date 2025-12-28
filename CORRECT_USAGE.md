# Correct Usage

## Your current code (WRONG):
```javascript
const fish = new Fish(client, { enabled: true, kick: true, ban: true });
// ... rest of code ...
fish.init(client);
```

## Correct usage:
```javascript
const fish = new Fish(); // No parameters!
// ... rest of code ...
fish.init(client); // Call init with client
```

## Full corrected section:

Replace line 16:
```javascript
// OLD (line 16):
const fish = new Fish(client, { enabled: true, kick: true, ban: true });

// NEW:
const fish = new Fish();
```

Keep line 239 as-is:
```javascript
fish.init(client);
```

That's it! The library doesn't take constructor parameters - it only uses `init()`.

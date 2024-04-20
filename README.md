# gotontfy

Gotify to ntfy.sh translation proxy. I made this for proxmox and it works with proxmox, but it should work with other implementations of gotify. Please make an issue if it does not.

## Setting it up

Copy `config.example.js` to `config.js` and modify it to your needs. Instructions are in that file.

```
yarn install
yarn start
```

Now, you can replace gotify with this proxy which will translate your requests to ntfy.
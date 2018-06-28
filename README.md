# Ethereum Block Explorer

Ethereum block explorer made with React, Github Pages and MetaMask

Demo: [https://blockexp.transmute.network/](https://blockexp.transmute.network/)

You can change the network in metamask, and the explorer will update. This is useful when you need to test multiple testnets or private nets.

### Installing

Install MetaMask:

- [Chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- [Brave](https://brave.com/)

```
git clone https://github.com/fabiohild/blockexp
cd blockexp
npm i
npm start
```

### Publishing

You can host with github pages, and even custom domains with SSL! Learn more here:

https://blog.github.com/2018-05-01-github-pages-custom-domains-https/

You will need to add a CNAME to public, and DNS record. For example:

Your github username is `coolbob`, you want to host on `blockexp.coolbob.com`.

You add CNAME record to dns for `blockexp` pointed at `coolbob.github.io`

And CNAME containing `blockexp.coolbob.com` to public.

Then:

```
npm run deploy
```

It takes a little while for github to use let's encryp to provision an SSL cert, be patient.

## License

This is a fork of: https://github.com/fabiohild/blockexp

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

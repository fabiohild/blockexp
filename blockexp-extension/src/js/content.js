console.log('yolo...');

// const addScript = src => {
//   var s = document.createElement('script');
//   s.setAttribute('src', src);
//   document.body.appendChild(s);
// };

// const addStyle = src => {
//   var link = document.createElement('link');
//   link.setAttribute('rel', 'stylesheet');
//   link.type = 'text/css';
//   link.href = src;
//   document.head.appendChild(link);
// };

// const scripts = ['https://code.getmdl.io/1.3.0/material.min.js'];
// const styles = [
//   'https://fonts.googleapis.com/icon?family=Material+Icons',
//   'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css'
// ];

// scripts.map(addScript);
// styles.map(addStyle);

// var div = document.createElement('div');

// div.innerHTML = `
// <dialog class="mdl-dialog">
//     <div class="mdl-dialog__content">
//       <pre class="eth-profile">
        
//       </pre>
//     </div>
//     <div class="mdl-dialog__actions">
//       <button type="button" class="mdl-button close">Close</button>
//     </div>
//   </dialog>
// `;

// document.body.appendChild(div);

// setTimeout(() => {
//   var dialog = document.querySelector('dialog');

//   if (!dialog.showModal) {
//     dialogPolyfill.registerDialog(dialog);
//   }

//   dialog.querySelector('.close').addEventListener('click', function() {
//     dialog.close();
//   });

//   document.querySelector('.eth-address').onclick = async function() {
//     let address = this.innerHTML;

//     let resp = await fetch('https://ipfs.transmute.network/api/v0/id');

//     let profile = {
//       address,
//       ipfs: await resp.json()
//     };

//     document.querySelector('.eth-profile').innerHTML = JSON.stringify(
//       profile,
//       null,
//       2
//     );

//     dialog.showModal();
//   };
// }, 0.25 * 1000);

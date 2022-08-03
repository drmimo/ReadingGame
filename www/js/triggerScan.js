function startQRScan(){
    Html5Qrcode.getCameras().then(devices => {
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    if (devices && devices.length) {
        let qrCover = document.querySelector('.qrCover')
        qrCover.style.display = 'flex'



        var cameraId = devices[0].id;
        // .. use this to start scanning.
        const html5QrCode = new Html5Qrcode(/* element id */ "reader");

        qrCover.addEventListener('click', (ev)=>{
            qrCover.style.display = 'none'
            html5QrCode.stop()
        })

        html5QrCode.start(
        cameraId, 
        {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
            // do something when code is read
            console.log(decodedText)
            let target = document.querySelector('form .cible');
            target.value = decodedText;
            let ev = new Event('input')
            target.dispatchEvent(ev)
            
            html5QrCode.stop()
            qrCover.style.display = 'none'
        },
        (errorMessage) => {
            // parse error, ignore it.
        })
        .catch((err) => {
        // Start failed, handle it.
        });

        html5QrCode.stop().then((ignore)=>{
            qrCover.style.display = 'none'
        }).catch((err)=>{

        })
    }
    }).catch(err => {
    // handle err
    console.log("can't find any camera")
    });
}
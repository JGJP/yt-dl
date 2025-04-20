const youtubedl = require("ytdl-core")
const fs = require("fs")

const arg = require('arg')({
    '--manual': String,
    '-m' : '--manual',
})

let vidURL = false
if(arg._[0] !== undefined){
    vidURL = arg._[0]
} else {
    console.log("please enter video url")
}

const DL_DIR = "dl"

;(async () => {

    console.log("getting info..")

    const info = await youtubedl.getInfo( vidURL, [] )

    let title = info.title
    title = title.replace(/[^a-zA-Z0-9]+/g,"-")
    const filename = title + ".mp4"

    console.log("downloading to "+filename)

    if ( !fs.existsSync(DL_DIR) ) fs.mkdirSync(DL_DIR)

    youtubedl( vidURL )
        .pipe(fs.createWriteStream( DL_DIR + "/" + filename ))

        // youtubedl.getInfo(url, options, function(err, info) {
        //   if (err) throw err;
         
        //   console.log('id:', info.id);
        //   console.log('title:', info.title);
        //   console.log('url:', info.url);
        //   console.log('thumbnail:', info.thumbnail);
        //   console.log('description:', info.description);
        //   console.log('filename:', info._filename);
        //   console.log('format id:', info.format_id);
        // })
             
        //     let video = youtubedl( vid, ['--format=18'], { cwd: __dirname } );
        //     // Will be called when the download starts.
        //     video.on('info', function(info) {
        //       console.log('Download started')
        //       console.log('filename: ' + info.filename)
        //       console.log('size: ' + info.size)
        //     })
             
        //     video.pipe(fs.createWriteStream(DL_DIR + '/' info.filename + '.mp4'));

})()
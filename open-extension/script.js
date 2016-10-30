window.addEventListener('load',function(){
    console.log('finished loading the extension resources');

    var open  = document.getElementById('open');
    var close  = document.getElementById('close');

    var indexes = []
    function createTab(config){
        chrome.tabs.create(
                config,
                function(tab){
                    indexes.push(tab.index)
                    console.log('index :', tab.index)
                }
                )
    }

    function closeTab(config){
        chrome.tabs.close(config)
    }
    var urls = [
            'https://twitter.com',
            'https://github.com',
            'https://stackoverflow.com',
            'https://sci-hub.com',
            'https://devdocs.io',
            'https://miziriya.com'
        ]
    
    open.addEventListener('click',function(e){
       e.preventDefault()
       // communication with chrome APIs
        for(var i = 0;i < urls.length;i++){
            createTab({url:urls[i]});
        }
    })
    close.addEventListener('click',function(e){
        e.preventDefault()
        console.log('indexes', indexes)

        for(var i = 0;i < indexes.length;i++){
           closeTab({index:indexes[i]})
        }
        console.log('close button clicked')
    })
})


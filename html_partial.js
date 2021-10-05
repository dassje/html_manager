(function () {
    const fetchPartial = (p) => new Promise(resolve => {
        fetch(p.attributes["src"].value).then(t => t.text()).then(async t => {
            var doc = new DOMParser().parseFromString(t, "text/xml");
            await treatPartial(doc);
            let docHTML = new XMLSerializer().serializeToString(doc);
            p.outerHTML = docHTML;
            resolve(); 
        });
    });

    const treatPartial = async (doc) => {
        let tags = doc.getElementsByTagName("partial");
        for (let part of tags) {
            await fetchPartial(part);
        }
    }

    treatPartial(document);
})(); 

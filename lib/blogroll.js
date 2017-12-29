const Promise = require('bluebird');

module.exports = function (args) {
    const n = parseInt(args[0]); 
    const blogs = this.site.data.blogroll.blogs;
    const feedparser = require('feedparser-promised');

    return Promise
        .all(blogs.map(blog => Promise.all([blog, feedparser.parse(blog.feed)])))
        .reduce(function (feeds, feed) {
            feeds.push(feed)
            return feeds;
        }, [])
        .then(function (feeds) {
            const result = feeds.map(feed => {
                const blog = feed[0];
                const items = feed[1];
                const latestItems = latest(items, n);
                return [blog, latestItems, latestItems[0]];
            }).sort(function (a, b){ 
                return compare(a[2], b[2]) < 0
            }).map(feed => {
                const blog = feed[0];
                const latestItems = feed[1];
                const itemsResult = latestItems.map(item => {
                    return listItem(item.date, item.link, item.title); 
                }).join('');
                return '<div><h1>'+ blog.title +'</h1><p><ul>' + itemsResult+ '</ul></p></div>';
            }).join('');

            return '<div><ul>' + result + '</ul></div>';
        })
        .catch(function (err) {
            console.log(err);
        });
}

function listItem(date, link, title) {
    return '<li>' + date.toISOString().slice(0, 10) +' <a href="' + link + '">' + title + '</a></li>'
}

function latest(items, n) {
    const l = items.length;
    if(compare(items[0], items[l-1]) < 0) {
        return items.slice(l-n, l).reverse();
    } else {
        return items.slice(0, n);
    }
}

function compare(a, b) {
    return a.date.toISOString().localeCompare(b.date.toISOString())
}
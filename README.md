

# Hexo Blogroll
Comparing to traditional blogroll, this plugin fetches latest articles from blog feed and sorts blogs by the latest update date.

**[Live Preview](https://hui-wang.info/blogroll)**

# Get started
## 1. Install plugin
```
npm install hexo-blogroll --save
```

## 2. Create Blogroll Data

Create a `blogroll.json` file and put it into `source/_data`
```json
{
    "blogs": [
        {
            "title": "Another blog",
            "feed": "https://another.blog/feed"
        },
        {
            "title": "Yet another blog",
            "feed": "https://yet.another.blog./feed"
        }
    ]
}
```
## 3. Create Blogroll Page

Create a hexo page and insert the `blogroll` tag as follows.
5 means for each blog, only the 5 latest posts are displayed.

```
---
title: Blogroll
---
{% blogroll 5 %}
```
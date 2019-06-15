---
comments: true
layout: page
title: 归档
---
---
<style type="text/css">
li {
  list-style-type:none;
}
.archive-item-link {
  color: #2ea9df;
  font-weight: 400;
}
.archive-item-link:hover {
  border-bottom: 1px dashed #2ea9df;
  text-decoration: none;
}
</style>

{% assign count = 1 %}
{% for post in site.posts reversed %}
    {% assign year = post.date | date: '%Y' %}
    {% assign nyear = post.next.date | date: '%Y' %}
    {% if year != nyear %}
        {% assign count = count | append: ', ' %}
        {% assign counts = counts | append: count %}
        {% assign count = 1 %}
    {% else %}
        {% assign count = count | plus: 1 %}
    {% endif %}
{% endfor %}

{% assign counts = counts | split: ', ' | reverse %}
{% assign i = 0 %}

{% for post in site.posts %}
    {% assign year = post.date | date: '%Y' %}
    {% assign nyear = post.next.date | date: '%Y' %}
    {% if year != nyear %}
## {{ post.date | date: '%Y' }} ({{ counts[i] }})
{:.archive-title}
        {% assign i = i | plus: 1 %}
    {% endif %}
* {{ post.date | date: '%m-%d' }} &raquo; [{{ post.title }}]({{ post.url }} "{{ post.title }}"){:.archive-item-link}
{% endfor %}


{% include disqus.html %}

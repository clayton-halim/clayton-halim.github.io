#!/bin/python3

import glob
import os

POST_DIR = '_posts/'
TAG_DIR = 'tags/'
FILENAMES = glob.glob(POST_DIR + '*md')

total_tags = set()

for filename in FILENAMES:
    with open(filename, 'r', encoding='utf8') as post:
        crawl = False

        for line in post:
            line = line.strip()

            if line == '---':
                crawl = not crawl
                if not crawl: # Finish parsing front matter
                    break
            current_tags = line.split()

            if current_tags[0] == 'tags:':
                total_tags.update(current_tags[1:])
                crawl = False
                break

old_tags = glob.glob(TAG_DIR + '*.md')

for tag in old_tags:
    os.remove(tag)
    
if not os.path.exists(TAG_DIR):
    os.makedirs(TAG_DIR)

for tag in total_tags:
    tag_filename = TAG_DIR + tag + '.md'

    with open(tag_filename, 'a') as tag_template:
        template_lines = ['---', 'layout: tagpage', 'title: "#{}"'.format(tag), 
                            'tag: {}'.format(tag), 'robots: noindex', '---']
        tag_template.writelines(line + '\n' for line in template_lines)

print("{} tag(s) generated".format(len(total_tags)))

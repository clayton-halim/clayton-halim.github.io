# Personal Website
Now statically generated

# Requirements
- Jekyll 4.1.1+
- Bundler 2.1.2
- Python 3

# Setup

Install plugins
```
sudo bundle
```

Set up post-commit hook to generate new tag pages (list of posts with a given tag).

`.git/hooks/post-commit`
```sh
#!/bin/sh

scripts/generate_tags.py
```

Make post-commit executable
```
chmod +x .git/hooks/post-commit
```

Run
```
jekyll serve --host=0.0.0.0
```
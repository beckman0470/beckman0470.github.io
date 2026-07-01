name: Chicken Dad Journal Build

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: Build site
        run: python cms/build.py
      - name: Release check
        run: python studio/release_check.py

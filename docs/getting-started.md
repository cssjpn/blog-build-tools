# Quick Start

This guide covers getting started with the `blog-build-tools`.

## Installation

In this _Getting Started_, you need `git`, `docker` and `docker-compose`.

### Git

* Windows: Download & install [git](https://git-scm.com/download/win).
* Mac: Install it with [Homebrew](https://brew.sh/), [MacPorts](http://www.macports.org/) or [installer](http://sourceforge.net/projects/git-osx-installer/).
* Linux (Ubuntu): `sudo apt-get install git-core`

### Docker

* Windows / Mac
  * https://www.docker.com/products/docker-desktop
* Linux (Ubuntu)
  * `docker`: https://docs.docker.com/engine/install/ubuntu/
  * `docker-compose`: https://docs.docker.com/compose/install/

Make sure the following commands are successful:

```shell
$ git
$ docker
$ docker-compose
```

## Create a new CSS Blog

### Get sample project

Clone [cssjpn/blog-build-tools](https://github.com/cssjpn/blog-build-tools) repository and copy example blog directory.

```shell
$ git clone https://github.com/cssjpn/blog-build-tools.git
$ cp -r blog-build-tools/example {YOUR_WORKING_DIR}/blog
```

### Initialize Git repository

```shell
$ cd {YOUR_WORKING_DIR}/blog
$ git init
```

### Setup blog theme


First, cleanup themes directry.

```shell
$ rm -rf themes/*
```

Add [jpazureid/hexo-theme-jpazure](https://github.com/jpazureid/hexo-theme-jpazure) blog theme as git submodule

```shell
$ git submodule add https://github.com/jpazureid/hexo-theme-jpazure.git themes/jpazure
```

### Customize site configuration file

You can configure most settings here.

```shell
$ vim _config.yml
```

### Start / Stop local server

Starts a local server. This is at `http://localhost:4000/`.

```shell
$ docker-compose up
 ...
blog_1  | INFO  Start processing
blog_1  | INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```

To stop server, press `Ctrl+C` and `docker-compose down`.

```shell
^CGracefully stopping... (press Ctrl+C again to force)
Stopping example_blog_1 ... done

$ docker-compose down
```

## Publish Blog with GitHub Pages

In this tutorial, we use [GitHub Actions](https://docs.github.com/en/actions) to deploy [GitHub Pages](https://pages.github.com/).

### Commit changes

```shell
$ git add .
$ git commit -m 'initial commit'
$ git branch -M main
```

### Push to remote repository

[Create a GitHub repository](https://github.com/new) named `{ORG_NAME}/blog`.

[Add new remote](https://docs.github.com/en/github/using-git/adding-a-remote) and [Push commits](https://docs.github.com/en/github/using-git/pushing-commits-to-a-remote-repository).

```shell
$ git remote add origin https://github.com/${ORG_NAME}/blog.git
$ git push -u origin main
```

The repository has a workflow definition for GitHub Actions ([`.github/workflows/pages.yml`](../example/.github/workflows/pages.yml)).

When new changes is pushed to `main` branch, the workflow triggered.
The jobs automatically builds blog page and uploads generated files to `gh-pages` branch.

You can check workflow runs at `Actions` section.
`https://github.com/{ORG_NAME}/blog/actions`

### Configure GitHub Pages

Once the workflow is finished, the generated pages can be found in the `gh-pages` branch of the repository.

To publish the page with GitHub Pages, navigate to `GitHub Pages` section in repository `Settings` and change Source to `gh-pages` branch.

# Development

## Workflow

### 1. Push changes and Merge to `main` branch

If you don't have a membership of the repo, please fork the repository and create a Pull Request.

### 2. Create new Release

To build a new container image, create new [Release](https://github.com/cssjpn/blog-build-tools/releases).
When new release is created, the automated job builds and uploads new image to [GHCR](https://github.com/orgs/cssjpn/packages/container/package/blog-build-tools).

https://github.com/cssjpn/blog-build-tools/blob/main/.github/workflows/release-build-tools.yml

## Manual Testing

To build images locally, run `docker` command as follows:

```shell
$ docker build -t blog-build-tools:local-test .
  ...
Successfully built e25a0e41bfa3
Successfully tagged blog-build-tools:local-test
```

Example blog site is available in [cssjpn/blog-example](https://github.com/cssjpn/blog-example) repository.

By default, [docker-compose.yaml](https://github.com/cssjpn/blog-example/blob/main/docker-compose.yaml) refer to a GHCR image.
Modify to a local image and run `docker-compose`.

```diff
 version: '3'
 services:
   blog:
-    image: ghcr.io/cssjpn/blog-build-tools:latest
+    image: blog-build-tools:local-test
     working_dir: /blog
     command: ["npm", "start"]
```

```shell
# clone blog-example
git clone git@github.com:cssjpn/blog-example.git
cd blog-example

# initialize git submodule
git submodule update -i

# Modify image to 'blog-build-tools:local-test'
vim docker-compose.yaml

# run build-tools
docker-compose up
```

You can enter to shell or run specific commands manually.

```shell
# Run bash
% docker-compose run blog bash
root@c423d8db1c46:/blog#

# Run 'npm test'
% docker-compose run blog npm test
```

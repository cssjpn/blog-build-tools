# Development

## Workflow

### 1. Push changes and Merge to `main` branch

If you don't have a membership of the repo, please fork the repository and create a Pull Request.

### 2. Create new Release

To build a new container image, create new [Release](https://github.com/cssjpn/blog-build-tools/releases). When new release is created, the automated job builds new image and uploads to [GHCR](https://github.com/orgs/cssjpn/packages/container/package/blog-build-tools).

https://github.com/cssjpn/blog-build-tools/blob/main/.github/workflows/release-build-tools.yml

## Manual Testing

Example blog site is available in [`example`](../example) directory.

To build images locally, run `docker` command as follows:

```shell
$ docker build -t blog-build-tools:test .
  ...
Successfully built e25a0e41bfa3
Successfully tagged blog-build-tools:test
```

By default, [`docker-compose.yaml`](../example/docker-compose.yaml) refer to a GHCR image. Modify to a local image and run `docker-compose`.

```diff
 version: '3'
 services:
   blog:
-    image: ghcr.io/cssjpn/blog-build-tools:latest
+    image: blog-build-tools:test
     working_dir: /blog
     command: ["npm", "start"]
```

```shell
$ docker-compose up
```

If you need to run commands manually, you can enter to shell by following command.

```shell
% docker-compose run blog bash
root@c423d8db1c46:/blog#
```

'use strict';

var should = require('chai').should(); // eslint-disable-line
const Hexo = require('hexo');
const defaultOption = require('../lib/helper').defaultOption;

describe('Root Tag generator', () => {
  const hexo = new Hexo(__dirname, {silent: true});
  hexo.init();
  const Post = hexo.model('Post');
  const PostForSort = hexo.model('Post');
  const generator = require('../lib/generator').bind(hexo);
  let posts, locals, postsForSort, localsForSort;

  // Default config
  hexo.config.tag_generator = {
    per_page: 10
  };
  hexo.config.root_tag_generator = defaultOption;

  before(() => {
    return Promise.all([
      Post.insert([
        {source: 'foo', slug: 'foo', date: 1e8 },
        {source: 'bar', slug: 'bar', date: 1e8 - 1},
        {source: 'baz', slug: 'baz', date: 1e8 - 2}
      ]).then(data => {
        posts = data;
        return posts[0].setTags(['foo', 'foo1', 'foo2']);
      }).then(() => {
        return posts[1].setTags(['bar', 'bar1', 'bar2']);
      }).then(() => {
        return posts[2].setTags(['piyo', 'bar', 'foo']);
      }).then(() => {
        locals = hexo.locals.toObject();
      }),
      Post.insert([
        {source: 'foo', slug: 'foo', date: 1e8 },
        {source: 'bar', slug: 'bar', date: 1e8 - 1},
        {source: 'baz', slug: 'baz', date: 1e8 - 2}
      ]).then(data => {
        postsForSort = data;
        return postsForSort[0].setTags(['foo', 'bar']);
      }).then(() => {
        return postsForSort[1].setTags(['bar', 'foo']);
      }).then(() => {
        return postsForSort[2].setTags(['piyo', 'foo', 'bar']);
      }).then(() => {
        localsForSort = hexo.locals.toObject();
      })]);
  });

  describe('set root tags', () => {
    it('set sub tag limit 2', () => {
      hexo.config.root_tag_generator = {
        sub_tag_limit: 2,
        root_tag_names: ['foo']
      };
      const result = generator(locals);
      // 7 tags ->
      result.length.should.eql(2);

      for (let i = 0, len = result.length; i < len; i++) {
        result[i].layout.should.eql(['tag', 'archive', 'index']);
      }

      result[0].path.should.eql('tags/foo/bar/');
      result[0].data.base.should.eql('tags/foo/bar/');
      result[0].data.total.should.eql(1);

      // Restore config
      hexo.config.root_tag_generator = defaultOption;
    });

    it('set multi root_tag_names', () => {
      hexo.config.root_tag_generator = {
        sub_tag_limit: 2,
        root_tag_names: ['foo', 'bar']
      };
      const result = generator(locals);
      // 7 tags ->
      result.length.should.eql(4);

      for (let i = 0, len = result.length; i < len; i++) {
        result[i].layout.should.eql(['tag', 'archive', 'index']);
      }

      result[0].path.should.eql('tags/foo/bar/');
      result[1].path.should.eql('tags/foo/foo1/');
      result[2].path.should.eql('tags/bar/bar1/');
      result[3].path.should.eql('tags/bar/bar2/');

      // Restore config
      hexo.config.root_tag_generator = defaultOption;
    });

    it('date order', () => {
      hexo.config.root_tag_generator = {
        sub_tag_limit: 10,
        root_tag_names: ['foo', 'bar']
      };
      const result = generator(localsForSort);

      for (let i = 0, len = result.length; i < len; i++) {
        result[i].layout.should.eql(['tag', 'archive', 'index']);
      }

      const fooBarTag = result.filter(item => {
        return item.path.match('tags/foo/bar/');
      });
      fooBarTag.length.should.eql(1);

      fooBarTag[0].data.posts.length.should.eql(3);

      const fooBarPosts = fooBarTag[0].data.posts.data;

      for (let i = 1; i < fooBarPosts.length; i++) {
        console.log(fooBarPosts[i - 1]);
        fooBarPosts[i - 1].date.isBefore(fooBarPosts[i].date).should.be.true;
      }
      // Restore config
      hexo.config.root_tag_generator = defaultOption;
    });


    it('no root_tag_names option', () => {
      hexo.config.root_tag_generator = {
        sub_tag_limit: 10,
        root_tag_names: []
      };

      const result = generator(locals);

      result.length.should.eql(0);

      // Restore config
      hexo.config.tag_generator.per_page = defaultOption;
    });

    it('set root_tag_names "all"', () => {
      hexo.config.root_tag_generator = {
        sub_tag_limit: 10,
        root_tag_names: 'all'
      };

      const result = generator(locals);

      result.filter(item => {
        return item.path.match('tags/foo/');
      }).length.should.eql(4);

      result.filter(item => {
        return item.path.match('tags/bar/');
      }).length.should.eql(4);

      result.filter(item => {
        return item.path.match('tags/piyo/');
      }).length.should.eql(2);

      result.filter(item => {
        return item.path.match('tags/foo1/');
      }).length.should.eql(2);

      // Restore config
      hexo.config.tag_generator.per_page = defaultOption;
    });
  });
});

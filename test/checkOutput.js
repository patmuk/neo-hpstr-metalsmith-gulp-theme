//config
const config = require('../configuration/config');
//      metadata = require(config.dir.config+'/metadata');

const chai = require('chai');
const readDir = require('fs-readdir-recursive');
      chai.use(require('chai-fs'));//check fileSystem
      chai.use(require('chai-things'));//checkArrays contents

describe('check the output filestructure: ', function (){
  describe('directory assets: ', function() {
    it('assets dir exists with subdirs', function() {
      chai.expect(config.dir.dest+'/assets').to.be.a.directory('missing dirctory').with.subDirs(['fonts', 'images', 'javascripts', 'stylesheets'],"dir missing");
    });
    it('assets/fonts identical to src', function() {
      const srcFiles = readDir(config.dir.src.root+'/assets/fonts');
      chai.expect(config.dir.dest+'/assets/fonts').to.be.a.directory('missing dirctory').with.deep.files(srcFiles,"not correctly copied")
    });
    it('assets/images identical to src', function() {
      const srcFiles = readDir(config.dir.src.root+'/assets/images');
      chai.expect(config.dir.dest+'/assets/images').to.be.a.directory('missing dirctory').with.deep.files(srcFiles,"not correctly copied")
    });
    it('assets/javascripts identical to src', function() {
      const srcFiles = readDir(config.dir.src.root+'/assets/javascripts');
      chai.expect(config.dir.dest+'/assets/javascripts').to.be.a.directory('missing dirctory').with.deep.files(srcFiles,"not correctly copied")
    });
    describe('checking assets/stylesheets: ', function() {
      it('assets/stylesheets includes all css from to src', function() {
        const srcFiles = readDir(config.dir.src.root+'/assets/stylesheets');
        chai.expect(config.dir.dest+'/assets/stylesheets').to.be.a.directory('missing dirctory').and.deep.include.contents(srcFiles,"not correctly copied")
      });
      it('does only contain *.css files', function() {
        const destFiles = readDir(config.dir.dest+'/assets/stylesheets');
        chai.expect(destFiles).to.contain.all.match(/\.css$/);
      });
    });
  });
  describe('static sites are in expected positions: ', function() {
    it('check index.html', function() {
      chai.expect(config.dir.dest).to.be.a.directory('missing dirctory').and.include.files(['index.html','404.html'],"missing files");
    });
    it('check about/index.html', function() {
      chai.expect(config.dir.dest+'/about').to.be.a.directory('missing dirctory').with.files(['index.html'],"unexpected files");
    });
    it('check posts/index.html', function() {
      chai.expect(config.dir.dest+'/posts').to.be.a.directory('missing dirctory').with.files(['index.html'],"unexpected files");
    });
    it('check search/index.html', function() {
      chai.expect(config.dir.dest+'/search').to.be.a.directory('missing dirctory').with.files(['index.html', 'index.json'],"unexpected files");
    });
  });
});

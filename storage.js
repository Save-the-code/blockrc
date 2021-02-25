'use strict';
const fs = require('fs');

/*
 * @prototype
 */
const StorageBase = function(){
    /*
     * @param {integer}
     * @public
     * @return {string}
    */
    this.getString = async function(block){
        if (!Number.isInteger( block ))
            return false;
        if (block >= _block_count)
            return false;
        return await _getString(block);
    }
    /*
     * @param {string}
     * @param {integer}
     * @param {integer}
     * @public
     * @return {boolean}
    */
    this.create = async function(
        file_name,
        block_size,
        block_count
    ){
        if (typeof file_name !== 'string')
            return false;
        if (!Number.isInteger( block_size ))
            return false;
        if (!Number.isInteger( block_count ))
            return false;
        return await _createFile(
             file_name,
             block_size,
             block_count
        );

    }
    /*
     * @param {string}
     * @public
     * @return {boolean}
    */
    this.open = async function(file_name){
        if (typeof file_name !== 'string')
            return false;
        return await _openFile(file_name);
    }

    let _busy      = false;
    let _started   = false;
    let _file_name = false;
    let _file      = false;
    let _buffer    = false; 
    /*
     * @param {string}
     * @param {integer}
     * @param {integer}
     * @private
     * @return {boolean}
    */
    const _createFile = async function(
        file_name,
        block_size,
        block_count
    ){
        _busy = true;
        _file_name = file_name;
        _started = true;

    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
    */
    const _checkFile = async function(){
        let error;
        let stat;
        await fs.stat(
             _file_name,
             function(e, s){
                 error = e;
                 stat  = s;
             }
        );
        if(error === null)
            return true;
        return false;
    }

    /*
     * @param {string}
     * @private
     * @return {boolean}
    */
    const _openFile = async function(file_name){
        if((await)
        let buffer = Buffer.alloc(32)
        _file_name = file_name;
        await fs.open(
             _file_name,
             'r', 
             function(err, fd){
                 if (err) throw err;
                 _file = fd;
             }
        );

    }
    /*
     * @param {integer}
     * @private
     * @return {string}
    */
    const _getString = async function(){
         await fs.read(
              _file,
              _buffer,
              0,
              2,
              16 
         );
    }
}

exports.Base =  StorageBase;

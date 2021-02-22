'use strict'
/*
 * @param {integer} // size of one block in byte `` UInt16 ``
 * @param {integer} // number of blocks  `` UInt16 ``
 * @prototype
 */
const CacheBase = function(){
    this.set = function(data, block){
        if(Buffer.byteLength(data) > _block_size)
            return false;
        if(block >= _block_count)
            return false;
        return _setBlock(data, block);
    }
    this.getString = function(block){
        return _getString(block);
    }
    this.getBuffer = function(block){
        return _getBuffer(block);
    }
    this.create = function( size, block ){
        return _createDB( size, block );
    }
    /* just for testing
    this.db = function(){
        return _db;
    }
    */
    let _db;
    let _started     = false;
    let _block_size   = 0;
    let _block_count = 0;
    const _ENCODE = 'utf8';
    const _checkHead = function(){
        _block_size  = _db.readUInt16BE(6);
        _block_count = _db.readUInt16BE(8);
    }
    const _writeHead = function(){
        _db.writeUInt16BE(
            _block_size,
            6
        );
        _db.writeUInt16BE(
            _block_count,
            8
        );
    }
    const _createDB = function(size, block){
         if ( _started ) // check db is defined
              return false;
        _block_size   = parseInt(size+4);
        _block_count  = parseInt(block);
        // buffer allocatioon
        _db = Buffer.alloc(
             _sizeCalc()
        );
        _writeHead( size, block);
        _started = true;
        return true;
    }
    const _sizeCalc = function(){
        return 10+( ( _block_size + 4 ) * _block_count);
    }
    const _headPosition = function(block){
        return 10+( ( _block_size + 4 ) * block);
    }
    const _blockSizePosition = function(block){
        return 10+( ( _block_size + 4 ) * block)+2;
    }
    const _blockPosition = function(block){
        return 10+( ( _block_size + 4 ) * block)+4;
    }
    const _readBlockSize = function(block){
        let size = _db.readUInt16BE(
             _blockSizePosition(block)
        );

        return size;
    }
    const _writeBlockSize = function(block, size){
        return _db.writeUInt16BE(
              size,
             _blockSizePosition(block)
        );

    }
    const _setBlock = function(data,block){
         let size = Buffer.byteLength(data);
         let position = _blockPosition( block );
         _db.write(
             data,
             position,
         );
         _writeBlockSize( 
             block,
             size
         );
         return true;
    }
    const _getString = function(block){
        let position =_blockPosition( block );
        let end = _readBlockSize( block ) + position;
        return _db.toString(
            _ENCODE,
            position,
            end
        );
    }
    const _getBuffer = function(block){
        let position =_blockPosition( block );
        let size = _readBlockSize( block );
        let end = size + position;
        let out  = Buffer.alloc(size);
        _db.copy(out, 0, posittion, end);
        return out;

    }
}

exports.Base =  CacheBase;

/*
 * buffer header :
 * -0-5 : "bl0ck
 * 6-7 : size
 * 8-9 : numbers
*/

/*
 * block header
 * 0-1 last set date
 * 2-3 current size
 *
 */

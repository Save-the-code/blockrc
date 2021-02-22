'use strict';
/*
 * @param {integer} // size of one block in byte `` UInt16 ``
 * @param {integer} // number of blocks  `` UInt16 ``
 * @prototype
 */
const CacheBase = function(){
    /*
     * @param {string} data
     * @param {integer} block
     * @public
     * @return {booolean}
     */
    this.setString = function(data, block){
        if(Buffer.byteLength(data) > _block_size)
            return false;
        if (!Number.isInteger( block ))
            return false;
        if(block >= _block_count)
            return false;
        if(typeof data !== 'string')
            return false;
        return _setBlock(data, block);
    };
    /*
     * @param {integer} block
     * @public
     * @return {string||booolean}
     */
    this.getString = function( block ){
        if (Number.isInteger(block))
            return _getString(block);
        return false;
    };
    /*
     * @param {integer} block
     * @public
     * @return {buffer||booolean}
     */
    this.getBuffer = function( block ){
        if (Number.isInteger(block))
            return _getBuffer(block);
        return false;
    };
    /*
     * @param {integer} block_size
     * @param {integer} block_count
     * @public
     * @return {string||booolean}
     */
    this.create = function( block_size, block_count ){
        return _createDB(
            block_size,
            block_count
        );
    };
    /* just for testing
    this.db = function(){
        return _db;
    }
    */
    /*
     * @private
     * @var {buffer}
     */
    let _db;
    /*
     * @private
     * @var {boolean}
     */
    let _started     = false;
    /*
     * @private
     * @var {integer}
     */
    let _block_size   = 0;
    /*
     * @private
     * @var {integer}
     */
    let _block_count = 0;
    /*
     * @private
     * @var {integer}
     */
    const _ENCODE = 'utf8';
    /*
     * @private
     */
    const _checkHead = function(){
        _block_size  = _db.readUInt16BE(6);
        _block_count = _db.readUInt16BE(8);
    };
    /*
     * @private
     */
    const _writeHead = function(){
        _db.writeUInt16BE(
            _block_size,
            6
        );
        _db.writeUInt16BE(
            _block_count,
            8
        );
    };
    /*
     * @param {integer} block_size
     * @param {integer} block_coount
     * @private
     * @return {boolean}
     */
    const _createDB = function(block_size, block_count){
        if ( _started ) // check db is defined
            return false;
        _block_size   = parseInt(block_size+4);
        _block_count  = parseInt(block_count);
        // buffer allocatioon
        _db = Buffer.alloc(
            _sizeCalc()
        );
        _writeHead( block_size, block_count);
        _started = true;
        return true;
    };
    /*
     * @param {integer} block_size
     * @param {integer} block_coount
     * @private
     * @return {boolean}
     */
    const _sizeCalc = function(){
        return 10+( ( _block_size + 4 ) * _block_count);
    };
    /*
     * @param {integer} block
     * @private
     * @return {integer}
     */
    const _headPosition = function(block){
        return 10+( ( _block_size + 4 ) * block);
    };
    /*
     * @param {integer} block
     * @private
     * @return {integer}
     */
    const _blockSizePosition = function(block){
        return 10+( ( _block_size + 4 ) * block)+2;
    };
    /*
     * @param {integer} block
     * @private
     * @return {integer}
     */
    const _blockPosition = function(block){
        return 10+( ( _block_size + 4 ) * block)+4;
    };
    /*
     * @param {integer} block
     * @private
     * @return {boolean}
     */
    const _readBlockSize = function(block){
        let size = _db.readUInt16BE(
            _blockSizePosition(block)
        );

        return size;
    };
    /*
     * @param {integer} block
     * @param {integer} data_size
     * @private
     */
    const _writeBlockSize = function(block, data_size){
        _db.writeUInt16BE(
            data_size,
            _blockSizePosition(block)
        );

    };
    /*
     * @param {string} data
     * @param {integer} block
     * @private
     * @return {boolean}
     */
    const _setBlock = function( data, block ){
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
    };
    /*
     * @param {integer} block
     * @private
     * @return {string}
     */
    const _getString = function(block){
        let position =_blockPosition( block );
        let end = _readBlockSize( block ) + position;
        return _db.toString(
            _ENCODE,
            position,
            end
        );
    };
    /*
     * @param {integer} block
     * @private
     * @return {buffer}
     */
    const _getBuffer = function(block){
        let position =_blockPosition( block );
        let size = _readBlockSize( block );
        let end = size + position;
        let out  = Buffer.alloc(size);
        _db.copy(out, 0, position, end);
        return out;

    };
};

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

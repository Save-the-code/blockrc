# What is blockrc!

The blockrc is an unsearchable data storage lib for blockchain based calculation.
Its designed for larger data collection.
Where the search is not important, just the fast data io.
The blocks are buffers so they can hold anything. (string, integer, json, binary(jpeg,ogg,mp4))
Some data can be multi block size.


# Block types.


## Fix sized block type.

The simpliest block collection every block holding the same size of data.
Easy for extend and easy to change.

### File format 

```

  +--------------------------------------------------------------+
  |                          header (8192 bytes)                 |
  |+-------+---------------+---------------+--------------------+|
  || bl0ck | size (Uint16) | count (UInt32 | timestamp (UInt32) ||
  |+-------+---------------+---------------+--------------------+|
  ||                          reversed (81757 bytes)            ||
  |+------------------------------------------------------------+|
  +--------------------------------------------------------------+
  |                           body                               |
  |   +-------+-------+-------+-------+-------+-------+-------+  |
  |   | block | block | block | block | block | block | block |  |
  |   +-------+-------+-------+-------+-------+-------+-------+  |
  |   | block | block | block | block | block | block | block |  |
  |   +-------+-------+-------+-------+-------+-------+-------+  |
  |   | block | block | block | block | block | block | block |  |
  |   +-------+-------+-------+-------+-------+-------+-------+  |
  |   | block | block | block | block | block | block | block |  |
  |   +-------+-------+-------+-------+-------+-------+-------+  |
  +--------------------------------------------------------------+

```

### Block format


```

  +--------------------------------------------------------------+
  |                       Head (32 bytes)                        |
  | +------------------+----------------------+----------------+ |
  | | lastmod (Uint32) | currentSize (Uint16) | type (2 bytes) | |
  | +------------------+----------------------+----------------+ |
  | | nBlock (UInt32)  | crc (Uint32)         |                | |
  | +------------------+----------------------+                | |
  | |                    reversed (16 bytes)                   | |
  | +----------------------------------------------------------+ |
  +--------------------------------------------------------------+
  |                          Data                                |
  +--------------------------------------------------------------+

```


### block type

   | bit |
   +-----+-----------
   |  1  |  empty
   |  2  |  multi
   |  3  |  compressed
   |  4  |  encrypted
   |  5  |  reversed
   |  6  |  reversed
   |  7  |  reversed
   |  8  |  reversed
   |  9  |  reversed
   | 10  |  reversed
   | 11  |  reversed
   | 12  |  reversed
   | 13  |  reversed
   | 14  |  reversed
   | 15  |  reversed
   | 16  |  reversed


## Dynamic block size type

Only for full backup/migration.


# planned features. 

-crc32 support
-last modification time stamp
-compression support
-encryption support
-threat safety



Frozen Table Cells
==================

A plugin that enables locked rows and columns on HTML tables.


Installation
------------

- Requires jQuery
- FrozenTable.css - Base styles needed
- FrozenTable.js  - Library

Usage
-----

### Default:

```
<script>
	new FrozenTable($('table'));
</script>
```

### Multiple:

```
<script>
	$('table').each(function() {
		new FrozenTable($(this));
	});
</script>
```

### Options:

```
<script>
	new FrozenTable($('table',
		{
			'rows': 2,
			'columns': 0
		}
	));
</script>
```

### Data Attributes:

```
<html>
	<table data-frozen-rows="2" data-frozen-columns="0">
		...
	</table>
</html>
<script>
	new FrozenTable($('table'));
</script>
```


Demo
----

There are two demos included.

### [demo.html](https://rawgit.com/cronin4392/FrozenTables/master/demo.html)
- Contains two tables with set size. One initialized with defaults (1 frozen row, 1 frozen column) the other with rows and columns set as data attribute
### [demo-fullpage.html](https://rawgit.com/cronin4392/FrozenTables/master/demo-fullpage.html)
- A table covering the window

PHP files can be used to generate more tables


Author
------

Stephen Cronin @ HYPERHYPER
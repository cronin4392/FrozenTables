function FrozenTable($table, options) {
	var _self = this;

	_self.$window = $(window);

	_self.$table = $table;
	_self.$parent = _self.$table.parent();
	_self.$wrapper = _self.$table.wrap('<div class="frozen-table">').parent();

	_self.$cloneWrapper = $('<div class="frozen-table--clones">').prependTo(_self.$wrapper);

	_self.$rowClone = null;
	_self.$columnClone = null;
	_self.$rowColumnClone = null;

	_self.tableSize = [_self.$table.outerWidth(), _self.$table.outerHeight()];
	_self.tableOffset = [_self.$wrapper.offset().left,_self.$wrapper.offset().top];
	_self.tableScroll = [_self.$wrapper.scrollLeft(), _self.$wrapper.scrollTop()];
	_self.wrapperSize = [_self.$wrapper.width(), _self.$wrapper.height()];

	_self.windowScroll = [_self.$window.scrollLeft(), _self.$window.scrollTop()];
	_self.windowSize = [window.innerWidth, window.innerWidth];

	// defaults
	_self.options = {
		'rows': 1,
		'columns': 1
	};

	// if set by JS
	if( options = typeof options !== 'undefined' ) {
		_self.options.rows = options[0];
		_self.options.columns = options[1];
	}

	// if set in markup
	if( _self.$table.attr('data-frozen-rows') ) {
		_self.options.rows = _self.$table.attr('data-frozen-rows');
	}
	if( _self.$table.attr('data-frozen-columns') ) {
		_self.options.columns = _self.$table.attr('data-frozen-columns');
	}

	_self.init();
}

FrozenTable.prototype = {
	init: function() {
		var _self = this;

		if( _self.options.rows >= 1 ) {
			_self.$rowClone = _self.$table.clone().wrap("<div>").parent();
			_self.$rowClone.addClass('frozen-table--clone frozen-table--row');
			_self.$cloneWrapper.prepend(_self.$rowClone);
		}
		if( _self.options.columns >= 1 ) {
			_self.$columnClone = _self.$table.clone().wrap("<div>").parent();
			_self.$columnClone.addClass('frozen-table--clone frozen-table--column');
			_self.$cloneWrapper.prepend(_self.$columnClone);
		}
		if( _self.options.rows >= 1 && _self.options.columns >= 1 ) {
			_self.$rowColumnClone = _self.$table.clone().wrap("<div>").parent();
			_self.$rowColumnClone.addClass('frozen-table--clone frozen-table--row-column');
			_self.$cloneWrapper.prepend(_self.$rowColumnClone);
		}

		_self.setSize();

		_self.bindEventHandlers();

		_self.setOffset();
		_self.setScroll();
		_self.setVisibility();
	},

	// Set size of cloned tables
	setSize: function() {
		var _self = this;

		// set table size
		_self.tableSize = [_self.$table.outerWidth(), _self.$table.outerHeight()];

		var columnWidth = 0;
		for( var i = 0; i < _self.options['columns']; i++ ) {
			columnWidth += _self.$table.find('.col-1').eq(i).outerWidth();
		}

		var rowHeight = 0;
		for( var i = 0; i < _self.options['rows']; i++ ) {
			rowHeight += _self.$table.find('tr').eq(i).outerHeight();
		}

		if( _self.$columnClone !== null ) {
			_self.$columnClone.width(columnWidth);
			_self.$columnClone.height(_self.tableSize[1]);
		}
		if( _self.$rowClone !== null ) {
			_self.$rowClone.width(_self.tableSize[0]);
			_self.$rowClone.height(rowHeight);
		}
		if( _self.$rowColumnClone !== null ) {
			_self.$rowColumnClone.width(columnWidth);
			_self.$rowColumnClone.height(rowHeight);
		}
	},

	bindEventHandlers: function() {
		var _self = this;
		
		_self.$parent.on('scroll', function() {
			var $this = $(this);

			_self.tableScroll = [$this.scrollLeft(), $this.scrollTop()];

			_self.setScroll();
			_self.setVisibility();
		});

		_self.$window.on('scroll', function() {
			var $this = $(this);

			_self.windowScroll = [$this.scrollLeft(), $this.scrollTop()];
			_self.windowSize = [window.innerWidth, window.innerWidth];

			if( _self.inView() ) {
				_self.tableOffset = [_self.$wrapper.offset().left,_self.$wrapper.offset().top];
				_self.wrapperSize = [_self.$wrapper.width(), _self.$wrapper.height()];

				_self.setOffset();
			}
			_self.setVisibility();
		});

		_self.$window.on('resize', function() {
			var $this = $(this);

			_self.windowScroll = [$this.scrollLeft(), $this.scrollTop()];
			_self.windowSize = [window.innerWidth, window.innerWidth];

			if( _self.inView() ) {
				_self.tableOffset = [_self.$wrapper.offset().left,_self.$wrapper.offset().top];
				_self.wrapperSize = [_self.$wrapper.width(), _self.$wrapper.height()];

				_self.setSize();
				_self.setOffset();
				_self.setScroll();
			}
			_self.setVisibility();
		});
	},

	// Set the X of the Frozen Row
	// and the Y of the Frozen Column
	// to what the containers scroll position is
	setScroll: function() {
		var _self = this;

		if( _self.$columnClone !== null ) {
			_self.$columnClone.css('transform', 'translateY(' + (-1 * _self.tableScroll[1]) + 'px)');
		}

		if( _self.$rowClone !== null ) {
			_self.$rowClone.css('transform', 'translateX(' + (-1 * _self.tableScroll[0]) + 'px)');
		}
	},

	// Set X and Y of the container
	// based on things such as the table X and Y
	// and window scroll
	setOffset: function() {
		var _self = this;

		// Should cache this value
		var offset = _self.$parent.offset();
		var offsetX = offset.left - _self.windowScroll[0];
		var offsetY = offset.top - _self.windowScroll[1];
		var width = _self.$parent.width();
		var height = _self.$parent.height();

		// Ultimately we want to have frozen rows/columns to stick to window if window passes object
		// if( offsetX < 0 ) {
		// 	width += offsetX;
		// 	offsetX = 0;
		// }
		// if( offsetY < 0 ) {
		// 	height += offsetY;
		// 	offsetY = 0;
		// }

		_self.offset = [offsetX, offsetY];

		_self.$cloneWrapper.css({
			'transform': 'translateX(' + _self.offset[0] + 'px) translateY(' + _self.offset[1] + 'px)',
			'width': width,
			'height': height
		});
	},

	inView: function() {
		var _self = this;

		var windowPosition = [
			_self.windowScroll[1], // top
			_self.windowScroll[0] + _self.windowSize[0], // right
			_self.windowScroll[1] + _self.windowSize[1], // bottom
			_self.windowScroll[0] // left
		];

		var tablePosition = [
			_self.tableOffset[1], // top
			_self.tableOffset[0] + _self.wrapperSize[0], // right
			_self.tableOffset[1] + _self.wrapperSize[1], // bottom
			_self.tableOffset[0] // left
		];

		var inView = 
			( windowPosition[2] > tablePosition[0] ) && 
			( windowPosition[0] < tablePosition[2] ) &&
			( windowPosition[1] > tablePosition[3] ) &&
			( windowPosition[3] < tablePosition[1] );

		return inView;
	},

	setVisibility: function() {
		var _self = this;

		if( _self.inView() ) {
			if( _self.$columnClone !== null ) {
				if( _self.tableScroll[0] == 0 ) {
					_self.$columnClone.removeClass('visible');
				}
				else {
					_self.$columnClone.addClass('visible');
				}
			}

			if( _self.$rowClone !== null ) {
				if( _self.tableScroll[1] == 0 ) {
					_self.$rowClone.removeClass('visible');
				}
				else {
					_self.$rowClone.addClass('visible');
				}
			}

			if( _self.$rowColumnClone !== null ) {
				if( _self.tableScroll[1] == 0 && _self.tableScroll[0] == 0 ) {
					_self.$rowColumnClone.removeClass('visible');
				}
				else {
					_self.$rowColumnClone.addClass('visible');
				}
			}
		}
		else {
			_self.$columnClone.removeClass('visible');
			_self.$rowClone.removeClass('visible');
			_self.$rowColumnClone.removeClass('visible');
		}
	}
}
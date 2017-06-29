// Single state object

var state = {
	items: []
};

var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

// State modification functions

function addItem(state, item) {
	state.items.push({
		displayName: item,
		checkedOff: false
	});
}

function getItem(state, itemIndex) {
	return state.items[itemIndex];
}

function deleteItem(state, itemIndex) {
	state.items.splice(itemIndex, 1);
}

function updateItem(state, itemIndex, newItemState) {
	state.items[itemIndex] = newItemState;
}

// Render function

function renderItem(item, itemId, itemTemplate, itemDataAttr) {
	var element = $(itemTemplate);
	element.find('.shopping-item').text(item.displayName);
	if (item.checkedOff) {
		element.find('.shopping-item').addClass('shopping-item__checked');
	}
	element.find('.js-shipping-item-toggle')
	element.attr(itemDataAttr, itemId);
	return element;
}

function renderList(state, listElement, itemDataAttr) {
	var itemsHTML = state.items.map(
		function(item, index) {
			return renderItem(item, index, listItemTemplate, itemDataAttr);
		});
		listElement.html(itemsHTML);
}

// Event listeners

$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#js-new-item').val());
    renderList(state, $('.shopping-list'), 'elementId');
    this.reset();
});

$('body').on('click', '.shopping-item-delete', function(event) {
	var itemId = $(event.target).closest('li').attr('elementId');
	deleteItem(state, itemId);
	renderList(state, $('.shopping-list'), 'elementId');
});

$('body').on('click', '.shopping-item-toggle', function(event) {
	var itemId = $(event.currentTarget.closest('li')).attr('elementId');
    var oldItem = getItem(state, itemId);

    updateItem(state, itemId, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    renderList(state, $('.shopping-list'), 'elementId');
  });






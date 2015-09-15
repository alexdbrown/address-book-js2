function Contact(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state, addressType) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.addressType = addressType;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $("input.addressType").val("");
    $("div.new-address").not(':first').remove();
  }

$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                              '<div class="form-group">' +
                                '<label for="addressType">Type</label>' +
                                '<input type="text" class="form-control addressType">' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="new-street">Street</label>' +
                                '<input type="text" class="form-control new-street">' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="new-city">City</label>' +
                                '<input type="text" class="form-control new-city">' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="new-state">State</label>' +
                                '<input type="text" class="form-control new-state">' +
                              '</div>' +
                              '</div>');
  });

  $("form#new-contact").submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();


    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedAddressType = $(this).find("input.addressType").val();

      var newAddress = { street: inputtedStreet, city: inputtedCity, state: inputtedState, addressType: inputtedAddressType };
      newContact.addresses.push(newAddress);

    });


    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() +  "</span></li>");

  $(".contact").last().click(function(){
    $("#show-contact").hide().fadeIn().css("color", "red");


    $("#show-contact h2").text(newContact.firstName + " " + newContact.lastName);
    $(".first-name").text(newContact.firstName);
    $(".last-name").text(newContact.lastName);

    $("ul#addresses").text("");
    newContact.addresses.forEach(function(address) {
      $("ul#addresses").append("<li>" + address.addressType + ": " + address.street + ", " + address.city + ", " + address.state + "</li>");
    });
  });
  resetFields();
});
});

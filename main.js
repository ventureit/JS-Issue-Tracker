//fetching issue data from local storage
function fetchIssues () {
  // JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string, i.e. string to value conversion
    var issues = JSON.parse(localStorage.getItem('issues'));//localStorage.getItem - method of the Storage interface, when passed a key name, will return that key's value or null if the key does not exist.
    var issuesList = document.getElementById('issuesList');//getElementById - returns an Element object representing the element whose id property matches the specified string.
    
    //declare the issues list innerHTML
    issuesList.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;
      
      issuesList.innerHTML +=   '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                                '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+ //button to set each issue status to Closed
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
  }

  //saving the issue to local storage after submit
  var issueInputForm = document.getElementById('issueInputForm').addEventListener('submit, saveIssue')//event listener for submit, passing in string issueInputForm

  //saving issue function
  function saveIssue(e)
  {
    var issueId = chance.guid();//generates a guid
    var issueDesc = document.getElementById('issueDescInput').nodeValue;
    var issueSeverity = document.getElementById('issueSeverityInput').nodeValue;
    var issueStatus = 'Open';

    //maybe saving the column names against variables
    //New issue object saved in local storage
    var issue = 
    {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: issueStatus
    }

    //get and set access information from private fields that you otherwise wouldn't be able to access. get can only read 
    //information from that private field and return it. set can only write information in that private field.
    if(localStorage.getItem('issues') === null)
    {
      var issues = [];
      issues.push(issue);
      localstorage.setItem('issues', JSON.stringify(issues));
    } else {
      var issues = JSON.parse(localStorage.getItem('issues'));
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    }

    
    document.getElementById('issueInputForm').reset(); //empty the form
    fetchIssues();
    e.preventDefault(); //prevent default submission of form
  }

    //set status of issue to closed
  function setStatusClosed (id)
  {
    var issues = JSON.parse(localStoarage.getItem('issues'));

    for(var i= 0; i < issuesLength; i++)
    {
      if(issues[i].id==id)
      {
        issues[i].status = "Closed";//JSON must use double quotes, javascript can use single or double
      }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
  }

  //delete an issue
  //== evaluates the value for T or F,  77=='77' equates to F
  //=== evaluates the value and type for T or F, 77=='77' equates to T
  function deleteIssue (id)
  {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issuesLength; i++)
    {
      if(issues[i].id == id)
      {
        issue[i].splice(i,1); //delete current item from the issues array - at position i remove 1 item
        //Example - at position 2 remove 2 items
        // var fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"];
        // fruits.splice(2, 2);
      }
    }

    localStorage.setItem('issues', JSON.stringify(issues)); //write back to local storage

    fetchIssues(); //update list output
  }
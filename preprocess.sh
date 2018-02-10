#!/bin/bash
perl -ale '
  BEGIN {
    $date = "";
  }

  if (/^(\d\d\d\d)-\d\d-\d\d \d\d:\d\d:\d\d \w\w\w\/-\d\d\d\d (?:\*|<.*>:?)(.*)$/g) {
    print $1, "\t", $2;
  } elsif (/^\d\d \w\w\w (\d\d\d\d) \d\d:\d\d:\d\d (?:\*|<.*>:?)(.*)$/g) {
    print "$1", "\t", $2;
  } elsif (/^--- (?:Log opened|Day changed) \w\w\w \w\w\w \d\d(?: \d\d:\d\d:\d\d)? (\d\d\d\d)$/g) {
    $date = "$1";
  } elsif (/^--- Log closed/g) {
    $date = "";
  } elsif ($date != "") {
    print $date, "\t", $_;
  }
' < all_logs.txt | sort > preprocessed.txt

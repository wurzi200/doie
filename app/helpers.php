<?php

function checkIfSuperAdmin()
{
  $currentUser = auth()->user();

  if ($currentUser->hasRole('super-admin-1')) {
    return true;
  } else {
    return false;
  }
}

function checkIfSuperAdminAndOrganization()
{
  $currentUser = auth()->user();

  if ($currentUser->hasRole('super-admin-1') && $currentUser->organization_id == 1) {
    return true;
  } else {
    return false;
  }
}

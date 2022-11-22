import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "./UserDrawer";
import { useLocation } from "react-router-dom";

function BooksIssued() {
  return (
    <>
      <ResponsiveDrawer>
        <div>BooksIssued</div>
      </ResponsiveDrawer>
    </>
  );
}

export default BooksIssued;

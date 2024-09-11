/**
 * Renders the portfolio page component.
 *
 * @returns {JSX.Element} The rendered portfolio page.
 */
import React from 'react';
import RenderPage from './renderPage';
import { portfolioData } from './data';

async function Portflio() {
  const data = portfolioData
  return <RenderPage data={data} />
}

export default Portflio

/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "ShopTranslatorModule.hpp"

SC_IMPLEMENT_MODULE(ShopTranslatorModule)

sc_result ShopTranslatorModule::InitializeImpl()
{
  m_ShopTranslatorService.reset(new ShopTranslatorPythonService("ShopTranslatorModule/ShopTranslatorModule.py"));
  m_ShopTranslatorService->Run();
  return SC_RESULT_OK;
}

sc_result ShopTranslatorModule::ShutdownImpl()
{
  m_ShopTranslatorService->Stop();
  m_ShopTranslatorService.reset();
  return SC_RESULT_OK;
}
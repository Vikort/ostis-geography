/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "PoliceTranslatorModule.hpp"

SC_IMPLEMENT_MODULE(PoliceTranslatorModule)

sc_result PoliceTranslatorModule::InitializeImpl()
{
  m_PoliceTranslatorService.reset(new PoliceTranslatorPythonService("PoliceTranslatorModule/PoliceTranslatorModule.py"));
  m_PoliceTranslatorService->Run();
  return SC_RESULT_OK;
}

sc_result PoliceTranslatorModule::ShutdownImpl()
{
  m_PoliceTranslatorService->Stop();
  m_PoliceTranslatorService.reset();
  return SC_RESULT_OK;
}
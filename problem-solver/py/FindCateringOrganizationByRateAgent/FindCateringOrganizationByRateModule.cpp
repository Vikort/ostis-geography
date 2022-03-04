#include "FindCateringOrganizationByRateModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByRateAgentModule)

sc_result FindCateringOrganizationByRateAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByRateService.reset(new FindCateringOrganizationByRateAgentPythonService("FindCateringOrganizationByRateAgent/FindCateringOrganizationByRateModule.py"));
  m_FindCateringOrganizationByRateService->Run();
  return SC_RESULT_OK;
}

sc_result FindCateringOrganizationByRateAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByRateService->Stop();
  m_FindCateringOrganizationByRateService.reset();
  return SC_RESULT_OK;
}
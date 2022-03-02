#include "FindCateringOrganizationByPriceCategoryModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByPriceCategoryAgentModule)

sc_result FindCateringOrganizationByPriceCategoryAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByPriceCategoryService.reset(new FindCateringOrganizationByPriceCategoryAgentPythonService("FindCateringOrganizationByPriceCategoryAgent/FindCateringOrganizationByPriceCategoryModule.py"));
  m_FindCateringOrganizationByPriceCategoryService->Run();
  return SC_RESULT_OK;
}

sc_result FindCateringOrganizationByPriceCategoryAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByPriceCategoryService->Stop();
  m_FindCateringOrganizationByPriceCategoryService.reset();
  return SC_RESULT_OK;
}

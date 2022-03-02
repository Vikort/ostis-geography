file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindCateringOrganizationByPriceCategoryModule SHARED ${SOURCES})

target_include_directories(FindCateringOrganizationByPriceCategoryModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindCateringOrganizationByPriceCategoryModule sc-memory)

add_dependencies(FindCateringOrganizationByPriceCategoryModule sc-memory)

sc_codegen(FindCateringOrganizationByPriceCategoryModule ${CMAKE_CURRENT_LIST_DIR})

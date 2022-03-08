file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindCateringOrganizationByCuisineModule SHARED ${SOURCES})

target_include_directories(FindCateringOrganizationByCuisineModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindCateringOrganizationByCuisineModule sc-memory)

add_dependencies(FindCateringOrganizationByCuisineModule sc-memory)

sc_codegen(FindCateringOrganizationByCuisineModule ${CMAKE_CURRENT_LIST_DIR})

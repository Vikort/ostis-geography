file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchCulinaryShopsModule SHARED ${SOURCES})

target_include_directories(SearchCulinaryShopsModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchCulinaryShopsModule sc-memory)

add_dependencies(SearchCulinaryShopsModule sc-memory)

sc_codegen(SearchCulinaryShopsModule ${CMAKE_CURRENT_LIST_DIR})
